import emailjs from 'emailjs-com';


export const sendSOSMessage = async ({ latitude, longitude }) => {
  const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const message = `🚨 Emergency! Please help me. Here's my location: ${mapLink}`;

  const templateParams = {
    to_name: "Emergency Contact",
    message,
  };
  
  


  return emailjs.send(
    'your_service_id',      // from EmailJS dashboard
    'your_template_id',
    templateParams,
    'your_public_key'
  );
};
