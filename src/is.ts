
/* MAIN */

const is = ( data: string ): boolean => {

  if ( !/^[a-zA-Z0-9_-]*$/.test ( data ) ) return false;

  return true;

};

/* EXPORT */

export default is;
