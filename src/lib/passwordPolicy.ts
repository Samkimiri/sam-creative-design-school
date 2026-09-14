// A short blocklist of the passwords real users actually pick when only a
// length check stands in their way - length alone doesn't stop "password1"
// or "11111111". Deliberately small: NIST 800-63B recommends checking
// against known-weak passwords rather than imposing arbitrary complexity
// rules, which push people toward predictable substitutions (Password1!)
// without meaningfully improving security.
const COMMON_WEAK_PASSWORDS = new Set([
  "password", "password1", "password123", "12345678", "123456789",
  "1234567890", "qwertyui", "qwerty123", "letmein1", "abc12345",
  "iloveyou", "admin123", "welcome1", "student1", "changeme",
]);

export const MIN_PASSWORD_LENGTH = 8;

/** Returns an error message if the password is too weak, or null if it's acceptable. */
export function validatePasswordStrength(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must include at least one letter and one number.";
  }
  if (/^(.)\1+$/.test(password)) {
    return "Password can't be the same character repeated.";
  }
  if (COMMON_WEAK_PASSWORDS.has(password.toLowerCase())) {
    return "That password is too common. Please choose something less guessable.";
  }
  return null;
}
