import { useState } from 'react';

export function useReadOnly(sdk) {
  const [readOnly, setReadOnly] = useState(sdk.form.readOnly);

  sdk.form.onReadOnlyChange((read) => setReadOnly(read));

  return {
    readOnly
  }
}