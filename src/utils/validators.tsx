export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return 'Email no puede estar vacio';
    if (!re.test(email)) return 'Oops! Necesitamos un email válido.';
    return '';
  };
  
  export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return 'La contraseña no puede estar vacia';
  
    return '';
  };
  
  export const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return 'El nombre no puede estar vacio.';
  
    return '';
  };