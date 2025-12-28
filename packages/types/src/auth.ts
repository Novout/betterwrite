import { Maybe } from "./utils";

export interface AuthState {
  // TODO: user typing
  user: any
  account: {
    project_id_activity: Maybe<number>,
  },
}