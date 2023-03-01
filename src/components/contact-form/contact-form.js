import React, { useState } from 'react';
import styled from 'styled-components';

const FORM_ENDPOINT =
  'https://public.herotofu.com/v1/57d25fd0-b876-11ed-aecb-e7ff0a88dd7c';

const Input = styled.input`
  margin: 10px 0;
  padding: 5px;
  border: 1px solid;
  border-radius: 0;
  font: inherit;
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 400px;
  min-height: 100px;
  margin: 10px 0;
  padding: 5px;
  border: 1px solid;
  border-radius: 0;
  font: inherit;
`;

const Button = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 1px solid;
  border-radius: 0;
  cursor: pointer;
`;

const Select = styled.select`
  margin: 10px 0;
  padding: 5px;
  border: 1px solid;
  border-radius: 0;
  font: inherit;
`;

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div>Thank you!</div>
        <div>We&apos;ll be in touch soon.</div>
      </>
    );
  }

  return (
    <form
      action={FORM_ENDPOINT}
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
    >
      <div>
        <Input type="text" placeholder="Your name" name="name" required />
      </div>
      <div>
        <Input type="email" placeholder="Email" name="email" required />
      </div>
      <div>
        <Select placeholder="Your message" name="message" required>
          <option value="">What would you like to talk about?</option>
          <option value="Shopify">Shopify Store</option>
          <option value="Contract">Contract Role</option>
          <option value="Permanent">Permanent Role</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Collaboration">Other</option>
        </Select>
      </div>
      <div>
        <Textarea placeholder="Your message" name="message" required />
      </div>
      <div>
        <Button type="submit">Send a message</Button>
      </div>
    </form>
  );
};

export default ContactForm;
