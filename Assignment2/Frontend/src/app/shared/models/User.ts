import WorkoutProgram from './WorkoutProgram';


export default class User {
  // tslint:disable-next-line:variable-name
  constructor(public username: string, public password: string, public workoutPrograms: WorkoutProgram[], public _id: string) {
  }
}
