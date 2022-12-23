// External
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { map } from 'rxjs/operators';

interface LoginBody {
    Email: string;
    Password: string;
    RemembeMe: boolean;
}

interface RegisterBody {
    Name: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
}

interface ForgotPasswordBody {
    Email: string;
}

export class UserTokens {
    accessToken: string;
    refreshToken: string;
    userId: string;
    promoterIdentifier: string;

    constructor(json: string) {
        if (json == null) return;

        var obj = JSON.parse(json);

        this.accessToken = obj.accessToken;
        this.refreshToken = obj.refreshToken;
        this.userId = obj.userId;
        this.promoterIdentifier = obj.promoterIdentifier
    }
}


@Injectable({
    providedIn: 'root'
})
export class Auth {
    private userTokens = new UserTokens(null);

    constructor(private http: HttpClient) {
    }

    hasValidIdToken(): boolean {
        return (this.userTokens != null && this.userTokens.accessToken != null);
    }

    authorizationHeader(): string {
        return "BEARER " + this.userTokens.accessToken;
    }

    accessToken(): string {
        return this.userTokens.accessToken;
    }

    userId(): string {
        return this.userTokens.userId;
    }

    promoterIdentifier(): string {
        return this.userTokens.promoterIdentifier;
    }

    login(username, password): Promise<Object> {
        // url
        const url: string = ENV.baseUrl + '/api/Account/LoginMobile';

        // body
        var body: LoginBody = {
            Email: username,
            Password: password,
            RemembeMe: true
        };

        // options
        const options = {
            headers: new HttpHeaders()
        };

        // call
        let promise = this.http.post(url, body, options).toPromise();

        // handle internal
        promise.then((response) => {
            let body = response["_body"];
            this.userTokens = new UserTokens(body);
        }).catch((error) => {
            // TODO: Handle
            if (error.status == 401) {
                console.log('invalid credentials')
            } else {

            }
        });

        // return promise
        return promise;
    }

    register(name, username, password): Promise<Object> {
        // url
        const url: string = ENV.baseUrl + '/Account/RegisterMobile';

        // body
        var body: RegisterBody = {
            Name: name,
            Email: username,
            Password: password,
            ConfirmPassword: password
        };

        // options
        const options = {
            headers: new HttpHeaders()
        };

        // call
        let promise = this.http.post(url, body, options).toPromise();

        // handle internal
        promise.then((response) => {
            let body = response["_body"];
            this.userTokens = new UserTokens(body);
        }).catch((error) => {
            // TODO: Handle
            console.log(error);
        });

        // return promise
        return promise;
    }

    forgotPassword(email): Promise<Object> {
        // url
        const url: string = ENV.baseUrl + '/Account/ForgotPasswordMobile';

        // body
        var body: ForgotPasswordBody = {
            Email: email
        };

        // options
        const options = {
            headers: new HttpHeaders()
        };

        // call
        let promise = this.http.post(url, body, options).toPromise();

        // handle internal
        promise.then((response) => {
            // Direct the user to check their email
        }).catch((error) => {
            // TODO: Handle
            console.log(error);
        });

        // return promise
        return promise;
    }

    logout(): Promise<Object> {
        // url
        const url: string = ENV.baseUrl + '/Account/LogoutMobile';

        // options
        const options = {
            headers: new HttpHeaders({
                'Authorization': this.authorizationHeader()
            })
        };

        // call
        let promise = this.http.post(url, null, options).toPromise();

        // handle internal
        promise.then((response) => {
            this.userTokens = new UserTokens(null);
        }).catch((error) => {

        });

        // return promise
        return promise;
    }

    stripeClientId() {
        let apiUrl = ENV.baseUrl + '/Account/StripeClientId';

        // options
        const options = {
            headers: new HttpHeaders({
                'Authorization': this.authorizationHeader()
            })
        };

        return this.http.get(apiUrl, options).pipe(
            map((res: Response) => {
                return res.text();
            })
        );
    }

    getResidentLocationWithProfileImage(userId) {
        let url: string =  ENV.baseUrl+ `/api/Account/GetResidentLocationWithProfileImage/${userId}`;

        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

}
