import {createGlobalStyle} from 'styled-components'
import styled from 'styled-components'

// Global Style
export const GlobalStyle = createGlobalStyle`
  body {
    background-color: white; 
  }
`
// -------------------------------------------------------------------------------------------------------------------//

// For tabs (addUser, deleteUser, displayUser) header
// TODO: move this file to `./interfaces`
export interface styledHeaderProps{
    readonly isSelected: boolean;
}

// FIXME: pass props to styled components -> https://styled-components.com/docs/api#typescript
export const StyledHeader = styled.div<styledHeaderProps>`
  color:darkblue;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  /*border-bottom: solid .2px darkblue;*/
  /*border-right: solid .5px lightgray;*/
  border-radius: 5px;
  padding: 0px 15px 0px 15px;
  background-color: ${props => props.isSelected? String('lightgray'): String('none')};
  &:hover{
    //cursor: pointer;
    background-color: lightgray;
  }
`