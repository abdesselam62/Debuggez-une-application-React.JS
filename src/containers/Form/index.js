import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  const [nom, setNom] = useState(""); // État pour le champ Nom
  const [prenom, setPrenom] = useState(""); // État pour le champ Prénom
  const [email, setEmail] = useState(""); // État pour le champ Email

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        setNom(""); // Réinitialise le champ "Nom"
        setPrenom(""); // Réinitialise le champ "Prénom"
        setEmail(""); // Réinitialise le champ "Email"
        onSuccess(); //  appele onSuccess ici si nécessaire
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder=""
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;