import { createGlobalStyle } from 'styled-components';
import { colors, media } from '../../common/styling';

export interface ThemeProps {
  bgColor: typeof colors.bg;
  textColor: typeof colors.text;
  darkTheme: boolean;
  setDarkTheme: (val: boolean) => void;
}

const GlobalStyle = createGlobalStyle<ThemeProps>`
    /* .w-bprimary {
        transition: all 0.12s;
        background-color: ${(props) =>
          props.darkTheme ? props.bgColor.darkPrimary : props.bgColor.primary}
    }
    .w-bsecondary {
        transition: all 0.12s;
        background-color: ${(props) =>
          props.darkTheme
            ? props.bgColor.darkSecondary
            : props.bgColor.secondary}
    }
    .w-btertiary {
        background-color: ${(props) => props.bgColor.tertiary}
    }

    .w-tprimary {
        color: ${(props) =>
          props.darkTheme
            ? props.textColor.darkPrimary
            : props.textColor.primary};
    }
    .w-tsecondary {
        color: ${(props) =>
          props.darkTheme
            ? props.textColor.darkSecondary
            : props.textColor.secondary};
    }
    .w-ttertiary {
        color: ${(props) => props.textColor.tertiary};
    } */
    .w-tlink {
        color: ${(props) => props.textColor.link};
        &:hover{
            filter: brightness(0.8);
        }
    }

    .w-icon {
        width: 24px;
        height: 24px;
        color: ${(props) => props.textColor.icon};
    }

    //swal customize style
    .swal2-container{
        color: #13153C;
        font-family: Lato;
    }
    button.swal2-styled{
        padding: 8px 32px;
        border-radius: 8px;
    }
    button.swal2-styled.swal2-cancel{
        color: #909099;
        border: 1px solid #909099;
    }
    button.swal2-styled.swal2-confirm{
        background-color: #40A3FF;
    }
    .swal2-container.swal2-backdrop-show, .swal2-container.swal2-noanimation{
        background-color: rgba(12, 14, 69, 0.4) !important;
    }
    button:focus{
        outline: 0
    }

    a{
        &:hover{
            text-decoration: none;
            font-size: inherit;
        }
    }

    html, body{
        font-size: 16px;
    }
    .MuiCardHeader-title{
        min-width: 200px;
    }
    
    ${media.lessThan('sm')`
        html, body{
            font-size: 15px;
        }
        .MuiGrid-item{
            padding-left: 16px !important;
            padding-right: 16px !important;
            /* padding: 16px; */
        }
        .MuiGrid-container{
            max-width: 100% !important;
        }
    `}
`;

export default GlobalStyle;
