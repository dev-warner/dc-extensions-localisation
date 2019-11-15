import React from "react";

import { useText } from "../hooks/useText";
import { useLocked } from "../hooks/useLocales";
import { useLocales } from "../hooks/useLocales";
import { useTranslation } from "../hooks/useTranslate";

import { Input } from "./Input";
import { Button } from "./Button";
import { InputList } from "./InputList";

export function Localise({ sdk, initalData }) {
  const { text, setText } = useText();
  const { locked, setLockedLocale } = useLocked(sdk);
  const { translate, translated, actions } = useTranslation(sdk, initalData, locked);

  useLocales(sdk, translated);

  return (
    <>
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        label={"Type text to translate here"}
      />

      <Button onClick={translate} label={"Click to translate"} />

      <InputList
        locked={locked}
        locales={sdk.locales.available}
        setLockedLocale={setLockedLocale}
        getTranslated={actions.getTranslated}
        updateTranslated={actions.updateTranslated}
      />
    </>
  );
}
