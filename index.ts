import { HAS160Service } from "./services/has-160.service";
import { HashCrackService } from "./services/hash-crack.service";

const hashCrackService = new HashCrackService();

const main = async () => {
  const message = "YegorovIlyaVitalievich";
  const hash = await HAS160Service.hashAsync(message);

  console.log(`Message: ${message}`);
  console.log(`Hash: ${hash}`);

    console.log(
      "Prototype search attack (Variant 1): ",
      await hashCrackService.performSearchAttack(message, hash, 'sequential')
    );

    console.log(
      "Prototype search attack (Variant 2): ",
      await hashCrackService.performSearchAttack(message, hash, "random")
    );

  console.log(
    "Birthday attack (Variant 1): ",
    await hashCrackService.performBirthdayAttack(message, hash, 'sequential')
  );

  console.log(
    "Birthday attack (Variant 2): ",
    await hashCrackService.performBirthdayAttack(message, hash, "random")
  );
};

main().then(() => console.log("Done!"));
