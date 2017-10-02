export class ResetPasswordPayload {
  constructor(public token: string, public password: string) { }
}
