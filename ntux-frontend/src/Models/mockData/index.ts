import { User } from 'Models/Auth';
import { ForumUser, Question, QuestionSummary, Tag, Comment } from '../Forum';

export const mockUser: User = {
  id: '12122',
  fullName: 'Andreas Sujono',
  email: 'andreassujono@gmail.com',
  age: 18,
  profession: 'software engineer',
  phoneNumber: '820183291',
  profileImage:
    'https://expertphotography.com/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg',
  description: 'w to deploy a nodeJs server in sds ',
  role: 'Software Engineer at google',
  followersCount: 192,
  followingsCount: 10,
  socialMedia: {
    facebookLink: 'https://www.google.com',
    telegramLink: 'https://www.google.com',
    twitterLink: 'https://www.google.com',
    whatsappLink: 'https://www.google.com',
    linkedinLink: 'https://www.google.com',
  },
};

export const mockQuestions: QuestionSummary[] = [
  {
    id: '12121',
    author: {
      id: '1212',
      name: 'andreas sujono',
      profileImage: '',
      description: '',
    },
    question: 'How to deploy a nodeJs server into Heroku?',
    description:
      'I’m trying to deploy a server written in NodeJs, I want to host it online and found out that Heroku is the best option for it. How to deploy it by using command line only......',
    postedDate: new Date(),
    numberOfVotes: 5,
    numberOfSolutions: 10,
    tags: [
      {
        id: '1',
        tag: 'EE4013',
        description: 'test',
      },
      {
        id: '2',
        tag: 'Course',
        description: 'test',
      },
    ],
  },
  {
    id: '12121',
    author: {
      id: '1212',
      name: 'andreas sujono',
      profileImage: '',
      description: '',
    },
    question: 'How to deploy a nodeJs server in sds to Heroku?',
    description:
      'I’m trying to deploy a server written in NodeJs, I want to host it online and found out that Heroku is the best option for it. How to deploy it by using command line only......',
    postedDate: new Date(),
    numberOfVotes: 5,
    numberOfSolutions: 10,
    tags: [
      {
        id: '1',
        tag: 'EE4013',
        description: 'test',
      },
      {
        id: '2',
        tag: 'random',
        description: 'test',
      },
    ],
  },
  {
    id: '12121',
    author: {
      id: '1212',
      name: 'andreas sujono',
      profileImage: '',
      description: '',
    },
    question: 'How to deploy a nodeJs server in sds to Heroku?',
    description:
      'I’m trying to deploy a server written in NodeJs, I want to host it online and found out that Heroku is the best option for it. How to deploy it by using command line only......',
    postedDate: new Date(),
    numberOfVotes: 5,
    numberOfSolutions: 10,
    tags: [
      {
        id: '1',
        tag: 'EE4013',
        description: 'test',
      },
      {
        id: '2',
        tag: 'Programming',
        description: 'test',
      },
    ],
  },
  {
    id: '12121',
    author: {
      id: '1212',
      name: 'andreas sujono',
      profileImage: '',
      description: '',
    },
    question: 'How to deploy a nodeJs server in sds to Heroku?',
    description:
      'I’m trying to deploy a server written in NodeJs, I want to host it online and found out that Heroku is the best option for it. How to deploy it by using command line only......',
    postedDate: new Date(),
    numberOfVotes: 5,
    numberOfSolutions: 10,
    tags: [
      {
        id: '1',
        tag: 'EE4013',
        description: 'test',
      },
      {
        id: '2',
        tag: 'Course',
        description: 'test',
      },
    ],
  },
];

export const mockQuestion: Question = {
  id: '12121',
  author: {
    id: '1212',
    name: 'andreas sujono',
    profileImage: '',
    description: '',
  },
  question: 'How to deploy a nodeJs server in sds to Heroku?',
  description:
    'I’m trying to deploy a server written in NodeJs, I want to host it online and found out that Heroku is the best option for it. How to deploy it by using command line only. I want to host it online and found out that Heroku is the best option for it. I want to host it online and found out that Heroku is the best option for it.',
  postedDate: new Date(),
  numberOfVotes: 5,
  numberOfSolutions: 10,
  tags: [
    {
      id: '1',
      tag: 'EE4013',
      description: 'test',
    },
    {
      id: '2',
      tag: 'Course',
      description: 'test',
    },
  ],
  enableVote: true,
  replies: [
    {
      id: '12121',
      author: {
        id: '122',
        name: 'Andreas Sujono',
        profileImage: '',
        description: '',
      },
      comment:
        'Lorem ipsum dolauctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam volutpat commodo sed egestas.',
      postedDate: new Date(),
      enableVote: false,
      enableReply: true,
    },
    {
      id: '12121',
      author: {
        id: '122',
        name: 'Andreas Sujono',
        profileImage: '',
        description: '',
      },
      comment:
        'Lorem ipsum dolauctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam volutpat commodo sed egestas.',
      postedDate: new Date(),
      enableVote: false,
      enableReply: true,
    },
    {
      id: '12121',
      author: {
        id: '122',
        name: 'Andreas Sujono',
        profileImage: '',
        description: '',
      },
      comment:
        'Lorem ipsum dolauctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam volutpat commodo sed egestas.',
      postedDate: new Date(),
      enableVote: false,
      enableReply: true,
    },
  ],
};

export const mockComments: Comment[] = [
  {
    id: '12121',
    author: {
      id: '12',
      name: 'Andreas Sujono',
      profileImage: '',
      description: '',
    },
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit euismod in pellentesque massa. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam volutpat commodo sed egestas. Amet consectetur adipiscing elit pellentesque.,',
    postedDate: new Date(),
    replies: [
      {
        id: '12121',
        author: {
          id: '122',
          name: 'Andreas Sujono',
          profileImage: '',
          description: '',
        },
        comment:
          'Lorem ipsum dolauctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam volutpat commodo sed egestas.',
        postedDate: new Date(),
        enableVote: false,
        enableReply: true,
      },
      {
        id: '12121',
        author: {
          id: '122',
          name: 'Andreas Sujono',
          profileImage: '',
          description: '',
        },
        comment:
          'Lorem ipsum dolauctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam volutpat commodo sed egestas.',
        postedDate: new Date(),
        enableVote: false,
        enableReply: true,
      },
      {
        id: '12121',
        author: {
          id: '122',
          name: 'Andreas Sujono',
          profileImage: '',
          description: '',
        },
        comment:
          'Lorem ipsum dolauctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam volutpat commodo sed egestas.',
        postedDate: new Date(),
        enableVote: false,
        enableReply: true,
      },
    ],
  },
  {
    id: '12121',
    author: {
      id: '122',
      name: 'Andreas Sujono',
      profileImage: '',
      description: '',
    },
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
    postedDate: new Date(),
    enableVote: false,
    enableReply: true,
  },
  {
    id: '12121',
    author: {
      id: '1232',
      name: 'Andreas Sujono',
      profileImage: '',
      description: '',
    },
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit euismod in pellentesque massa. Suscipit adipiscing bibendum est ultricies integer quis auctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam volutpat commodo sed egestas. Amet consectetur adipiscing elit pellentesque.,',
    postedDate: new Date(),
    enableVote: true,
  },
];

export const mockTags: Tag[] = [
  {
    id: '1',
    tag: 'html',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  },
  {
    id: '2',
    tag: 'css',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
  },
];

export const mockForumUsers: ForumUser[] = [
  {
    id: '1212',
    fullName: 'Andreas Sujono',
    email: 'andreassujono@gmail.com',
    age: 21,
    level: 20,
    role: 'Software Engineer',
    profileImage: '',
    description: '',
  },
  {
    id: '121',
    fullName: 'Jonathan Keane',
    email: 'jonKeane@gmail.com',
    age: 21,
    level: 20,
    role: 'Principal Engineer at Tanks',
    profileImage: '',
    description: '',
  },
  {
    id: '3212',
    fullName: 'Andreas Sujono',
    email: 'andreassujono@gmail.com',
    age: 21,
    level: 20,
    role: 'Software Engineer',
    profileImage: '',
    description: '',
  },
  {
    id: '4212',
    fullName: 'Jack Lee',
    email: 'jackLee@gmail.com',
    age: 21,
    level: 20,
    role: 'Software Engineer at Google',
    profileImage: '',
    description: '',
  },
  {
    id: '5212',
    fullName: 'Andreas Sujono',
    email: 'andreassujono@gmail.com',
    age: 21,
    level: 20,
    role: 'Software Engineer',
    profileImage: '',
    description: '',
  },
];
