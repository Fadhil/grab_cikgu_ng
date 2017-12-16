import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: any, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: this.parseError(message) });
    }

    parseError(aString) {
        try {
            const o = aString;
            let error_message: string = '';
            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object",
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === 'string'){
                return o;
            } else {
                if (o && typeof o === 'object') {
                    if (typeof(o.errors.detail) === 'string') {
                    return o.errors.detail;
                    } else {
                    for (const key in o.errors) {
                        if (o.errors.hasOwnProperty(key)) {
                        error_message = error_message + key + ': ' + o.errors[key];
                        return error_message;
                        }
                    }
                    }
                }
            }
        } catch (e) {
          return aString;
        }
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
