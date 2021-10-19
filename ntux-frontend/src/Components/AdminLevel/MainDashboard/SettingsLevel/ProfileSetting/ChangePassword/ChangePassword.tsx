import React, { memo, useState } from 'react';
import { TextInput } from 'common/Components/Input';
import { Container } from './Styles';
import { ButtonGroup } from 'react-dre/lib/Button';
import { SecondaryButton, PrimaryButton } from 'common/Components/Button';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  return (
    <Container>
      <h1>Change Password</h1>
      <h2>Change your current password to a new one</h2>

      <TextInput
        label="Current Password"
        value={oldPassword}
        onChange={(value) => setOldPassword(value)}
        placeholder="Enter your current password"
        type="password"
        required
        mt="24px"
      />
      <TextInput
        label="New Password"
        value={newPassword}
        onChange={(value) => setNewPassword(value)}
        placeholder="Enter your new password"
        type="password"
        required
        mt="24px"
      />
      <TextInput
        label="Confirm New Password"
        value={newConfirmPassword}
        onChange={(value) => setNewConfirmPassword(value)}
        placeholder="Confirm your new password"
        type="password"
        required
        mt="24px"
        mb="40px"
      />

      <ButtonGroup align="right">
        <SecondaryButton>Cancel</SecondaryButton>
        <PrimaryButton>Update Password</PrimaryButton>
      </ButtonGroup>
    </Container>
  );
};

export default memo(ChangePassword);
