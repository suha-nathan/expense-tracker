import ExpenseForm from "../../components/ExpenseForm";

const Create = () => {
  return (
    <ExpenseForm
      method="Create"
      expenseInfo={{
        store: "",
        image: null,
        subTotal: "",
        total: "",
        purchaseDate: "",
        category: "",
      }}
    />
  );
};

export default Create;
