import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import {
  Typography,
  Box,
  Modal,
  Avatar,
  CardHeader,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Pagination,
  Rating,
  Divider,
  TablePagination,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';

export function ChatBox({ tutorRequestId }: any) {
  return (
    <Paper
      sx={{
        width: '80vw',
        height: '80vh',
        maxWidth: '500px',
        maxHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Paper
        id="style-1"
        sx={{
          width: 'calc( 100% - 20px )',
          margin: 10,
          overflowY: 'scroll',
          height: 'calc( 100% - 80px )',
        }}
      >
        <MessageLeft
          data={{
            message: 'Hello',
            createdAt: '2020-01-01',
            user: {
              fullName: 'John Doe',
            },
          }}
        />
        <MessageRight
          data={{
            message: 'Hello',
            createdAt: '2020-01-01',
            user: {
              fullName: 'John Doe',
            },
          }}
        />
      </Paper>
      {/* <TextInput /> */}
    </Paper>
  );
}

const styles = {
  messageRow: {
    display: 'flex',
  },
  messageRowRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  messageBlue: {
    position: 'relative',
    marginLeft: '20px',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#A8DDFD',
    width: '60%',
    //height: "50px",
    textAlign: 'left',
    font: "400 .9em 'Open Sans', sans-serif",
    border: '1px solid #97C6E3',
    borderRadius: '10px',
    '&:after': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: '15px solid #A8DDFD',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      top: '0',
      left: '-15px',
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: '17px solid #97C6E3',
      borderLeft: '16px solid transparent',
      borderRight: '16px solid transparent',
      top: '-1px',
      left: '-17px',
    },
  },
  messageOrange: {
    position: 'relative',
    marginRight: '20px',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f8e896',
    width: '60%',
    //height: "50px",
    textAlign: 'left',
    font: "400 .9em 'Open Sans', sans-serif",
    border: '1px solid #dfd087',
    borderRadius: '10px',
    '&:after': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: '15px solid #f8e896',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      top: '0',
      right: '-15px',
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: '17px solid #dfd087',
      borderLeft: '16px solid transparent',
      borderRight: '16px solid transparent',
      top: '-1px',
      right: '-17px',
    },
  },

  messageContent: {
    padding: 0,
    margin: 0,
  },
  messageTimeStampRight: {
    position: 'absolute',
    fontSize: '.85em',
    fontWeight: '300',
    marginTop: '10px',
    bottom: '-3px',
    right: '5px',
  },

  orange: {
    // color: theme.palette.getContrastText(deepOrange[500]),
    // backgroundColor: deepOrange[500],
    width: 40,
    height: 40,
  },
  avatarNothing: {
    // color: 'transparent',
    // backgroundColor: 'transparent',
    width: 40,
    height: 40,
  },
  displayName: {
    marginLeft: '20px',
  },
};

export const MessageLeft = ({ data }: any) => {
  const message = data.message ? data.message : 'no message';
  const timestamp = data.createdAt;
  const photoURL = data?.user?.currentAvatar?.imageUrl || '#';
  const displayName = data?.user?.fullName;
  return (
    <>
      <div style={styles.messageRow}>
        <Avatar alt={displayName} sx={styles.orange} src={photoURL}></Avatar>
        <div>
          <div style={styles.displayName}>{displayName}</div>
          <div style={styles.messageBlue}>
            <div>
              <p style={styles.messageContent}>{message}</p>
            </div>
            <div style={styles.messageTimeStampRight}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export const MessageRight = ({ data }: any) => {
  const message = data.message ? data.message : 'no message';
  const timestamp = data.createdAt ? data.CreatedAt : '';
  return (
    <div style={styles.messageRowRight}>
      <div style={styles.messageOrange}>
        <p style={styles.messageContent}>{message}</p>
        <div style={styles.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};
