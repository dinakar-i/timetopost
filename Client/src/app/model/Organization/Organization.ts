export class Member {
  constructor(public userId: number, public fullName: string, public role: string) {}
}

export class Platform {
  constructor(
    public id: number,
    public platform: string,
    public accessToken: string,
    public tokenExpiry: string // Date if you want -> change to Date and convert on parse
  ) {}
}

export class Organization {
  constructor(
    public id: number,
    public name: string,
    public members: Member[] = [],
    public platforms: Platform[] = []
  ) {}
}
