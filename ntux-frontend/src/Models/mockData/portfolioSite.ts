import { AllSiteData } from '../PortfolioSite';

export const mockSiteData: AllSiteData = {
  userSummary: {
    data: {
      fullName: 'Andreas Sujono',
      role: 'Frontend Engineer',
      email: 'andr0075@e.ntu.edu.sg',
      phoneNumber: '+65 83066172',
      description: `Andreas is a passionate and tech enthusiast with 4 years of working experience in 7 different companies with diverse industries such as robotics, ed-tech, gaming, blockchain, data, and cybersecurity company. He is well known for his website development skills in both frontend and backend sides which follow the best practice and clean architecture.

        Visit his website at http://andreassujono.com/
        Looking for software engineering internship for August-December 2021 period`,
      resumeLink: '',
      backgroundImage:
        'https://media-exp1.licdn.com/dms/image/C4E16AQGdOxRvyrPZYA/profile-displaybackgroundimage-shrink_350_1400/0/1623390586484?e=1629936000&v=beta&t=jEExigX1DyB7_myhA9D4VubX8VYuapcNrTNBZBLufpw',
      profileImage:
        'https://media-exp1.licdn.com/dms/image/C4E03AQGq_6a7NMxyqA/profile-displayphoto-shrink_400_400/0/1623389195049?e=1629936000&v=beta&t=YfW27HvxAkVlA6eGM1zVTFGbIIfPJ1irrs0TzR-P44c',
      socialMedias: [
        {
          id: '1',
          type: 'facebook',
          link: 'www.facebook.com',
        },
        {
          id: '2',
          type: 'instagram',
          link: 'www.instagram.com',
        },
        {
          id: '3',
          type: 'linkedin',
          link: 'www.linkedin.com',
        },
      ],
    },
  },
  WorkExperiences: {
    data: [
      {
        id: '1',
        companyName: 'Dathena Science',
        companyLogo:
          'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1631/posts/32751/image/HR%20Company%20Logo%20Generator%20copy.jpg',
        role: 'Frontend Engineer',
        employmentType: 'full_time',
        location: 'Singapore',
        description:
          'Developed a scalable ReactJs Application with Typescript, Redux, and D3.js as the charting library\nDeveloped a scalable ReactJs Application with Typescript, Redux, and D3.js as the charting library',
        startDate: new Date(),
      },
      {
        id: '2',
        companyName: 'Dathena Science',
        companyLogo:
          'https://cms-assets.tutsplus.com/cdn-cgi/image/width=630/uploads/users/1631/posts/32751/image/HR%20Company%20Logo%20Generator%20copy.jpg',
        role: 'Frontend Engineer',
        employmentType: 'full_time',
        location: 'Singapore',
        description:
          'Developed a scalable ReactJs Application with Typescript, Redux, and D3.js as the charting library',
        startDate: new Date(),
      },
    ],
  },
  educations: {
    data: [
      {
        id: '1',
        schoolName: 'NTU',
        schoolLogo:
          'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Nanyang_Technological_University_coat_of_arms_vector.svg/1200px-Nanyang_Technological_University_coat_of_arms_vector.svg.png',
        grade: '4.68',
        fieldOfStudy: 'Electrical and Electronic Engineering',
        degree: 'Bachelor Degree',
        description:
          'Developed a scalable ReactJs Application with Typescript, Redux, and D3.js as the charting library',
        startDate: new Date(),
      },
    ],
  },
  certifications: {
    data: [
      {
        id: '1',
        name: 'ReactJs certification',
        organization: 'Coursera',
        startDate: new Date(),
        link: '',
        imageUrl:
          'https://res.cloudinary.com/dx6juznlw/image/upload/v1622651046/vegan-recipe-app/andreas-website/certificates/coursera3_znehlp.png',
      },
      {
        id: '2',
        name: 'ReactJs certification',
        organization: 'Coursera',
        startDate: new Date(),
        link: '',
        imageUrl:
          'https://res.cloudinary.com/dx6juznlw/image/upload/v1622651046/vegan-recipe-app/andreas-website/certificates/coursera3_znehlp.png',
      },
      {
        id: '3',
        name: 'ReactJs certification',
        organization: 'Coursera',
        startDate: new Date(),
        link: '',
        imageUrl:
          'https://res.cloudinary.com/dx6juznlw/image/upload/v1622651046/vegan-recipe-app/andreas-website/certificates/coursera3_znehlp.png',
      },
    ],
  },
  siteContribution: {
    data: {
      questionCount: 23,
      solutionCount: 10,
      blogCount: 10,
    },
    setting: {
      order: 6,
    },
  },
  skills: {
    data: [
      {
        id: '1',
        name: 'HTML, CSS',
      },
      {
        id: '2',
        name: 'ReactJs',
      },
    ],
    setting: {
      order: 7,
    },
  },
  blogs: {
    data: [
      {
        id: '1',
        title: 'lorem ipsum dolor sit amet',
        shortDescription:
          'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
        author: {
          id: '1',
          name: 'Andreas Sujono',
          profileImage: '',
          description: '',
        },
        thumbnail:
          'https://neilpatel.com/wp-content/uploads/2017/09/image-editing-tools.jpg',
        postedDate: new Date(),
        status: 1,
      },
      {
        id: '2',
        title: 'lorem ipsum dolor sit amet',
        shortDescription:
          'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
        author: {
          id: '1',
          name: 'Andreas Sujono',
          profileImage: '',
          description: '',
        },
        thumbnail:
          'https://neilpatel.com/wp-content/uploads/2017/09/image-editing-tools.jpg',
        postedDate: new Date(),
        status: 1,
      },
      {
        id: '3',
        title: 'lorem ipsum dolor sit amet',
        shortDescription:
          'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet',
        author: {
          id: '1',
          name: 'Andreas Sujono',
          profileImage: '',
          description: '',
        },
        thumbnail:
          'https://neilpatel.com/wp-content/uploads/2017/09/image-editing-tools.jpg',
        postedDate: new Date(),
        status: 1,
      },
    ],
    setting: {
      order: 5,
    },
  },
};
