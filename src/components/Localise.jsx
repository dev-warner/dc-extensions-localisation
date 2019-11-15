import React from "react";

import { useText } from "../hooks/useText";
import { useLocked } from "../hooks/useLocked";
import { useLocales } from "../hooks/useLocales";
import { useReadOnly } from "../hooks/useReadOnly";
import { useTranslation } from "../hooks/useTranslate";

import { Input } from "./Input";
import { Button } from "./Button";
import { InputList } from "./InputList";

export function Localise({ sdk, initalData }) {
  const { text, setText } = useText();
  const { readOnly } = useReadOnly(sdk);
  const { locked, setLockedLocale } = useLocked(sdk);
  const { translate, translated, actions } = useTranslation(sdk, initalData, text, locked);

  useLocales(sdk, translated);

  return (
    <>
      <Input
        value={text}
        readOnly={readOnly}
        onChange={e => setText(e.target.value)}
        label={"Type text to translate here"}
      />

      <Button onClick={translate} label={"Click to translate"} />

      <InputList
        locked={locked}
        readOnly={readOnly}
        locales={sdk.locales.available}
        setLockedLocale={setLockedLocale}
        getTranslated={actions.getTranslated}
        updateTranslated={actions.updateTranslated}
      />
    </>
  );
}
