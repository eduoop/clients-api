export const formatCPF = (cpf: string) => {
  // Remove caracteres não numéricos
  const numericCPF = cpf.replace(/\D/g, "");

  // Adiciona separadores e formata o CPF
  return numericCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
