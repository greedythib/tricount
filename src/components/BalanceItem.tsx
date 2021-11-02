import { userProp } from "../interfaces/interfaces";
// material UI components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DraftsIcon from "@mui/icons-material/Drafts";

function BalanceItem({ user }: userProp) {
  const creditors = user.creditors;
  return (
    <div className="balance-item">
      {creditors.length > 0 ? (
        <List>
          {creditors.map((creditor, index) => {
            let list_text = `${user.name} owes ${creditor.value} SOL to ${creditor.name}`;
            return (
              <ListItem disablePadding key={`${creditor.name}-${index}`}>
                <ListItemButton>
                  <ListItemIcon>
                    <LocalAtmIcon />
                  </ListItemIcon>
                  <ListItemText primary={list_text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </div>
  );
}

export default BalanceItem;
