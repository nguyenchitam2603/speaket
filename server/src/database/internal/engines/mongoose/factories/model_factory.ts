import { User } from '../../../../../share/models';
import { UserModel } from '../models';

export class ModelFactory {
  static createModel(modelClassName: String) {
    let model: any = null;

    switch (modelClassName) {
      case User.name:
        model = UserModel;
        break;

      default:
        throw 'Invalid model type';
    }

    return model;
  }
}
