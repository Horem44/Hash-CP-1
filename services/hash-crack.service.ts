import { HAS160Service } from "./has-160.service";

export class HashCrackService {
  private readonly _characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?";

  public async performSearchAttack(
    originalMessage: string,
    originalHash: string,
    attackType: "sequential" | "random"
  ): Promise<any> {
    let newMessage = originalMessage;
    let i = 1;

    while (true) {
      if (attackType === "random") {
        newMessage = this._modifyRandomCharacter(newMessage);
      } else {
        newMessage = `${originalMessage}${i}`;
      }

      const newHash = await HAS160Service.hashAsync(newMessage);

      if (newHash.slice(-4) === originalHash.slice(-4)) {
        return { index: i, originalMessage, originalHash, newMessage, newHash };
      }

      i++;
    }
  }

  public async performBirthdayAttack(
    originalMessage: string,
    originalHash: string,
    attackType: "sequential" | "random"
  ): Promise<any> {
    const hashRecord: Record<string, string> = {
      [originalHash.slice(-8)]: originalMessage,
    };

    let newMessage = originalMessage;
    let i = 1;

    while (true) {
      if (attackType === "random") {
        newMessage = this._modifyRandomCharacter(newMessage);
      } else {
        newMessage = `${originalMessage}${i}`;
      }

      const newHash = await HAS160Service.hashAsync(newMessage);

      if (
        hashRecord[newHash.slice(-8)] &&
        !(
          attackType === "random" &&
          newMessage === hashRecord[newHash.slice(-8)]
        )
      ) {
        return {
          originalMessage: hashRecord[newHash.slice(-8)],
          newMessage,
          originalHash: await HAS160Service.hashAsync(
            hashRecord[newHash.slice(-8)]
          ),
          newHash,
          index: i,
        };
      }

      hashRecord[newHash.slice(-8)] = newMessage;
      i++;
    }
  }

  private _modifyRandomCharacter(inputString: string): string {
    const randomIndex = Math.floor(Math.random() * inputString.length);
    return (
      inputString.substring(0, randomIndex) +
      this._getRandomCharacter() +
      inputString.substring(randomIndex + 1)
    );
  }

  private _getRandomCharacter(): string {
    return this._characters[
      Math.floor(Math.random() * this._characters.length)
    ];
  }
}
