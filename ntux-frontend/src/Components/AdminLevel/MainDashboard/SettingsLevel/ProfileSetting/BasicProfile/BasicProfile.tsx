import React, { memo, useState } from 'react';
import { FileInput, TextAreaInput, TextInput } from 'common/Components/Input';
import { Container } from './Styles';
import { ButtonGroup } from 'react-dre/lib/Button';
import { SecondaryButton, PrimaryButton } from 'common/Components/Button';

const BasicProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [desc, setDesc] = useState('');
  const [profession, setProfession] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  const handleChangeImage = (value: any) => {
    setImageFile(value.file);
    setImageUrl(value.url);
  };

  return (
    <Container>
      <h1>basic Profile</h1>
      <h2>
        Your profile can be seen by other people, write something that is unique
        and identifiy you
      </h2>
      <FileInput
        width="140px"
        height="140px"
        label=""
        value={imageUrl}
        onChange={handleChangeImage}
        mt="24px"
        placeholder={
          <>
            <img
              src="https://image.flaticon.com/icons/png/512/847/847969.png"
              style={{ width: '100%' }}
            />
          </>
        }
      />
      <TextInput
        label="Full Name"
        value={fullName}
        onChange={(value) => setFullName(value)}
        placeholder="Enter your Full Name"
        type="text"
        required
        mt="24px"
      />
      <TextInput
        label="Email"
        value={email}
        onChange={(value) => setEmail(value)}
        placeholder="Enter your email address"
        type="email"
        required
        mt="24px"
      />
      <TextAreaInput
        label="Description"
        value={desc}
        onChange={(value) => setDesc(value)}
        placeholder="A short brief description about you, this will be shown in the blog author and forum"
        type="text"
        required
        mt="24px"
      />
      <TextInput
        label="Profession? if student, provide your school name"
        value={profession}
        onChange={(value) => setProfession(value)}
        placeholder="Enter your Profession"
        required
        mt="24px"
        mb="40px"
      />

      <ButtonGroup align="right">
        <SecondaryButton>Cancel</SecondaryButton>
        <PrimaryButton>Update Profile</PrimaryButton>
      </ButtonGroup>
    </Container>
  );
};

export default memo(BasicProfile);
