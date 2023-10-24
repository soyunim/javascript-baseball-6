import { MissionUtils } from "@woowacourse/mission-utils";
import { GAME_MSG, ERROR_MSG } from "./Messages";

// 0. 게임 시작 메세지 출력
const gameStart = async () => {
  MissionUtils.Console.print(GAME_MSG.START);
  const COMPUTER_NUM = getComputerNum();
  compareNum(COMPUTER_NUM);
};

// 1. 컴퓨터의 랜덤 숫자
const getComputerNum = () => {
  const COMPUTER = [];
  while (COMPUTER.length < 3) {
    let number = MissionUtils.Random.pickNumberInRange(1, 9);
    if (!COMPUTER.includes(number)) {
      COMPUTER.push(number);
    }
  }
  return COMPUTER.join("");
};

// 2. 유저의 숫자 입력
const getUserNum = async () => {
  try {
    const USER_NUM = await MissionUtils.Console.readLineAsync(GAME_MSG.INPUT);
    if (USER_NUM.length !== 3) {
      throw new Error(ERROR_MSG.INPUT_ERROR_LEN);
    }
    return USER_NUM;
  } catch (error) {
    throw new Error("[ERROR]");
  }
};

const compareNum = async (COMPUTER_NUM) => {
  try {
    while (true) {
      let strike = 0;
      let ball = 0;
      const USER_NUM = await getUserNum();
      MissionUtils.Console.print(GAME_MSG.INPUT + USER_NUM);

      for (let i = 0; i < 3; i++) {
        if (COMPUTER_NUM[i] === USER_NUM[i]) {
          strike++;
        } else if (COMPUTER_NUM.includes(USER_NUM[i])) {
          ball++;
        }
      }

      if (ball === 0 && strike === 0) {
        MissionUtils.Console.print(GAME_MSG.NOTHING);
      } else if (ball > 0 && strike === 0) {
        MissionUtils.Console.print(ball + GAME_MSG.BALL);
      } else if (ball === 0 && strike > 0) {
        MissionUtils.Console.print(strike + GAME_MSG.STRIKE);
      } else {
        MissionUtils.Console.print(
          ball + GAME_MSG.BALL + " " + strike + GAME_MSG.STRIKE
        );
      }

      if (strike === 3) {
        break;
      }
    }
  } catch (error) {
    throw new Error("[ERROR]");
  }
};
export { gameStart };
