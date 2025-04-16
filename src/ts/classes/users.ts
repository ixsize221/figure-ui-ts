class User {
  public name: string;
  protected _login: string;
  protected _password: string;
  protected grade: number;
  constructor(name: string, login: string, pass: string, grade: number) {
    this.name = name;
    this._login = login;
    this._password = pass;
    if (grade > 0) this.grade = grade;
    else console.log("grade error");
  }

  get login() {
    return this._login;
  }
  set login(str) {
    console.log("Логин нельзя изменить");
  }
  set password(str) {
    this._password = str;
  }
  get password() {
    return "*********";
  }
}

const user1 = new User("Paul McCartney", "paul", "1234", 3);
const user2 = new User("George Harrison", "george", "5678", 2);
const user3 = new User("Richard Starkey", "ringo", "8523", 3);
console.log(user1, user2);
