export default function validPhoneNumber(phoneNumber: string): boolean {
  const phonePattern = /^\+?(\d{1,3})?[-.\s]?(\d{3})[-.\s]?(\d{3})[-.\ s]?(\d{4})$/;

  return phonePattern.test(phoneNumber);
}
