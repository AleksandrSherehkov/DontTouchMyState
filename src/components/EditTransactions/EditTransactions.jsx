import { Button } from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonWrapper,
  ExpenseSpan,
  IncomeSpan,
  InputWrapper,
  ModalAddWrapper,
  ModalTransactionTitle,
  RadioWrapperChoose,
  StyledField,
  StyledForm,
} from 'components/ModalAddTransaction/ModalAddTransaction.styled';
import { Formik } from 'formik';
import { useState } from 'react';
import { closeModalEditTransaction } from 'redux/global/globalSlice';
import { selectEditTransaction } from 'redux/global/globalSelectors';
import { useCategoriesType } from 'hook/categoriesFilter';
import { selectCategories } from 'redux/transaction/transactionSelectors';
import {
  editTransactionThunk,
  getAllTransactionsThunk,
} from 'redux/transaction/transactionOperations';

export const EditTransactions = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector(selectCategories);
  const [expenseCategories, incomeCategories] =
    useCategoriesType(allCategories);

  const transactionData = useSelector(selectEditTransaction);
  const { amount, categoryId, comment, id, transactionDate, type } =
    transactionData;

  const initialValues = {
    transactionDate,
    type,
    categoryId,
    comment,
    amount: `${type === 'EXPENSE' ? amount * -1 : amount}`,
  };

  const selectedCategory = expenseCategories.find(
    item => item.id === categoryId
  );
  const [changedType, setChangedType] = useState(type);
  const [changeCategoryData, setChangeCategoryData] =
    useState(selectedCategory);

  const handleSubmit = (value, { resetForm }) => {
    const normalNumber =
      changedType === 'EXPENSE'
        ? Number(value.amount * -1)
        : Number(value.amount);

    const newData = {
      ...value,
      type: changedType,
      amount: normalNumber,
      categoryId: `${
        changedType === 'INCOME'
          ? incomeCategories[0].id
          : value.id ?? changeCategoryData.id
      }`,
    };

    dispatch(
      editTransactionThunk({ transactionId: id, transaction: newData })
    ).then(() => dispatch(getAllTransactionsThunk()));
    resetForm();
  };

  const handleChangeType = value => {
    setChangedType(value);
    if (value === 'EXPENSE') {
      setChangeCategoryData({
        id: '719626f1-9d23-4e99-84f5-289024e437a8',
        name: 'Other expenses',
        type: 'EXPENSE',
      });
    }
  };
  return (
    <ModalAddWrapper>
      <ModalTransactionTitle>Edit transaction</ModalTransactionTitle>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <StyledForm>
          {/* ========================= Radio Buttons ========================= */}
          <RadioWrapperChoose>
            <IncomeSpan
              onClick={() => handleChangeType('INCOME')}
              isSelected={changedType === 'INCOME'}
            >
              Income
            </IncomeSpan>
            <span>/</span>
            <ExpenseSpan
              onClick={() => handleChangeType('EXPENSE')}
              isSelected={changedType === 'EXPENSE'}
            >
              Expense
            </ExpenseSpan>
          </RadioWrapperChoose>

          {/* ========================= SELECT ========================= */}
          {changedType === 'EXPENSE' && (
            <p>{changeCategoryData.name}</p> //TODO
          )}

          {/* ========================= INPUTS ========================= */}
          <InputWrapper>
            <StyledField
              type="number"
              name="amount"
              placeholder="0.00"
              weight="600"
            />
            <StyledField type="date" name="transactionDate" />
          </InputWrapper>
          <StyledField type="text" name="comment" placeholder="Comment" />

          {/* ========================= BUTTONS ========================= */}
          <ButtonWrapper>
            <Button text="save" type="submit" />
            <Button
              text="cancel"
              variant="secondary"
              onClick={() => dispatch(closeModalEditTransaction())}
            />
          </ButtonWrapper>
        </StyledForm>
      </Formik>
    </ModalAddWrapper>
  );
};