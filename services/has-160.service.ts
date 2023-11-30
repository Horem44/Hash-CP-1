import { exec } from "child_process";

export class HAS160Service {
  public static hashAsync(message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(
        `python ./python-helpers/has-160.py "${message}"`,
        (error, stdout, stderr) => {
          if (error) {
            reject(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            reject(`stderr: ${stderr}`);
            return;
          }
          resolve(stdout.trim());
        }
      );
    });
  }
}
