import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqsPublic = [
  {
    question: 'What is RVnBO?',
    answer: 'RVnBO is a platform for discovering and hosting verified off-grid stays.',
  },
  {
    question: 'Do I need an account to explore?',
    answer: 'No, you can browse spots as a guest, but creating an account unlocks full features.',
  },
  {
    question: 'Is it free to join?',
    answer: 'Yes! Signing up is completely free for travelers and landowners.',
  },
  {
    question: 'How do I host my land?',
    answer: 'Sign up as a landowner and submit your property details through our listing form.',
  },
];

const faqsTraveler = [
  {
    question: 'How do I book a spot?',
    answer: 'Simply select a spot, check availability, and confirm your booking through the platform.',
  },
  {
    question: 'Are all stays safe and legal?',
    answer: 'Yes, all listed spots are verified for safety and compliance with local laws.',
  },
  {
    question: 'Can I stay on raw land?',
    answer: 'Yes, as long as the host allows it and regulations permit overnight stays.',
  },
  {
    question: 'Do I need electricity or water hookups?',
    answer: 'Many spots do not require hookups, but options vary depending on the host.',
  },
];

const faqsLandowner = [
  {
    question: 'How do I list my land?',
    answer: 'Sign up as a landowner and submit your property details through our listing form.',
  },
  {
    question: 'Is it safe to host travelers?',
    answer: 'Yes, RVnBO verifies all guests and provides secure booking and messaging systems.',
  },
  {
    question: 'How much can I earn?',
    answer: 'Earnings depend on your land, amenities, and pricing. You can update rates anytime.',
  },
  {
    question: 'Do I need permits to host?',
    answer: 'It depends on local regulations. RVnBO encourages hosts to comply with all local laws.',
  },
];

export default function FAQs({ role }) {
  // Choose FAQs based on role
  const faqs =
    role === 'traveler'
      ? faqsTraveler
      : role === 'landowner'
      ? faqsLandowner
      : faqsPublic;

  return (
    <Box sx={{ width: '100%', mx: 'auto', mt: 4 }}>
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          sx={{
            boxShadow: 'none',
            border: '1px solid #e0e0e0',
            mb: 2,
            borderRadius: '8px',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{ minHeight: 56 }}
          >
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{ fontSize: '0.85rem', color: '#555', textAlign: 'start' }}
            >
              <span style={{ fontWeight: 'bold' }}>Ans:</span> {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
