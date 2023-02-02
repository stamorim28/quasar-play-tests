import { useQuasar } from "quasar";
export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      type: "positive",
      message: message || "Conexão com API bem sucedida",
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: "negative",
      message: message || "Falha ao carregar países!",
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
