import { UserInterfaceMinimal, UserInterface } from "../interfaces/interfaces";
// FIXME: add interfaces

export function remove(creditor: string, creditors: UserInterfaceMinimal[]) {
  let creditorIndex = creditors.indexOf(
    creditors.filter((cred) => {
      return cred.name == creditor;
    })[0]
  );
  if (creditorIndex > -1) {
    creditors.splice(creditorIndex, 1);
  }
  return creditors;
}

export function update(
  creditor: string,
  creditors: UserInterfaceMinimal[],
  amount: number
) {
  // CASE 1: Not a creditor yet => add a new creditor
  if (
    creditors.filter((cred) => {
      return cred.name == creditor;
    }).length === 0
  ) {
    if (amount > 0) {
      creditors.push({ name: creditor, value: String(amount) });
    }
  }
  // CASE 2: Already a creditor
  else {
    let oldCredit = creditors.filter((cred) => {
      return cred.name == creditor;
    })[0].value;
    let newCredit = parseFloat(oldCredit) + amount;
    if (newCredit > 0) {
      creditors.filter((cred) => {
        return cred.name == creditor;
      })[0].value = String(newCredit);
    } else if (newCredit == 0) {
      // FIXME
      creditors = remove(creditor, creditors);
    }
  }
  return creditors;
}
