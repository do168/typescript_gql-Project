import { Mysql as mysql } from '../config/mysql';
import ServiceUtil from '../util/serviceUtil';
import { DBException } from '../util/customException';
import { User } from '../model/User';

export default class userRepository {
  // DI
  private serviceUtil: ServiceUtil;
  constructor(serviceUtil: ServiceUtil) {
    this.serviceUtil = serviceUtil;
  }

  // select
  public async getUser(id: string): Promise<User> {
    const param = [id];
    const sql = `
    SELECT
      id,
      nickname
    FROM
      user
    WHERE
      id = ? and status = 1
    `;
    const result = await mysql.connect(sql, param);
    if (this.serviceUtil.isEmpty(result) || this.serviceUtil.isEmpty(result[0])) {
      throw new DBException();
    }
    return result[0][0];
  }
}
