'use client';

import {
  Container,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Link as MuiLink,
  styled,
} from '@mui/material';
import Image from 'next/image';
import courseLogo from '../../../../public/react-logo.svg';
import schoolLogo from '../../../../public/rss-logo.png';
import theme from '@/app/theme';

const teamMembers = [
  {
    name: 'Alan Noruzbaev',
    role: 'Frontend Developer',
    github: 'https://github.com/alannrzbv',
    photo: '',
    bio: `Alan is a frontend developer from Bishkek, Kyrgyzstan...`,
    contributions: [
      'Designed and implemented key components for REST Client.',
      'Implemented critical core functionality and infrastructure.',
      'Maintained Git workflows and provided mentorship.',
    ],
  },
  {
    name: 'Dmitriy Radovnya',
    role: 'Team Lead & Developer',
    github: 'https://github.com/DmitriyRadovnya',
    photo: '',
    bio: `Dmitriy is a  frontend developer and team lead from Mozyr, Belarus...`,
    contributions: [
      'Led the team, planned architecture, and coordinated development.',
      'Built responsive layouts and ensured cross-browser compatibility.',
      'Formulated complex interface tasks for deeper team collaboration.',
    ],
  },
  {
    name: 'Tatiana Golub',
    role: 'Frontend Developer',
    github: 'https://github.com/tatiana-golub',
    photo: '',
    bio: `Tatiana is a frontend developer from Kaliningrad, Russia...`,
    contributions: [
      'Implemented Supabase for authentication and i18n for multilingual support.',
      'Proposed improvements and built layout blocks.',
      'Created a presentation for the team and uploaded a video to YouTube,',
    ],
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  flex: '1 1 320px',
  maxWidth: 380,
  margin: '0 auto',
  minHeight: 460,
  border: `1px solid ${theme.palette.primary.main}`,
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
  },
}));

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Meet Our Team
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="stretch"
        gap={4}
        mt={3}
      >
        {teamMembers.map((member) => (
          <StyledCard elevation={0} key={member.name}>
            <Avatar
              src={member.photo}
              alt={member.name}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                border: '2px solid #1976d2',
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: '600' }}>
              {member.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {member.role}
            </Typography>
            <MuiLink
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ mt: 1, fontWeight: 'bold', color: 'primary.main' }}
            >
              GitHub Profile
            </MuiLink>
            <CardContent sx={{ mt: 2, px: 0 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {member.bio}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Key Contributions:
              </Typography>
              <ul style={{ textAlign: 'left', paddingLeft: 20, margin: 0 }}>
                {member.contributions.map((contribution, i) => (
                  <li key={i}>
                    <Typography variant="body2">{contribution}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </StyledCard>
        ))}
      </Box>

      <Box mt={3} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Our Collaboration
        </Typography>
        <Typography maxWidth="md" mx="auto" sx={{ mx: 'auto' }}>
          Our project was built on strong communication, mutual support, and
          shared responsibility. From initial planning to final deployment, each
          team member contributed not only code, but also ideas and energy. Our
          effective collaboration ensured that deadlines were met and challenges
          were tackled with confidence.
        </Typography>
      </Box>

      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        columnGap={1}
      >
        <MuiLink
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: 'inline-block' }}
        >
          <Image src={courseLogo} alt="React Course" width={50} height={50} />
        </MuiLink>
        <Typography
          variant="h6"
          fontWeight={theme.typography.fontWeightRegular}
        >
          course gave us the opportunity to complete the final assignment
          developed by the
        </Typography>
        <MuiLink
          href="https://rs.school/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: 'inline-block' }}
          textAlign={'center'}
        >
          <Image src={schoolLogo} alt="RS School" width={50} height={50} />
        </MuiLink>
      </Box>
    </Container>
  );
};

export default AboutUs;
