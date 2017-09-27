/*****************************CLIENT ROUTES*****************************/
export let baseUrl: string = '/';
export let signInUrl: string = `${this.baseUrl}signin`;
export let signUpUrl: string = `${this.baseUrl}signup`;
export let dashboardUrl: string = `${this.baseUrl}dashboard`;
export let recoverUrl: string = `${this.baseUrl}recover`;
export let calculatorUrl: string = `${this.dashboardUrl}/calculator`;
export let engineerUrl: string = `${this.dashboardUrl}/engineer`;
export let githubUrl: string = `${this.dashboardUrl}/github`;


/*****************************SERVER ROUTES*****************************/
export let signInApi: string = '/signin';
export let signUpApi: string = '/signup';
export let signOutApi: string = '/signout';
export let signInStatusApi: string = `${this.signInApi}/status`;
