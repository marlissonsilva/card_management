export function passwordValidate(passowrd: string) {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  const passwordMatch = regex.test(passowrd)

  if (passwordMatch) {
    return true
  }

  return false
}


