import React from "react";

export function formatPrice(value) {
  const money = value?.toString().split(".");
  if (money) {
    if (money.length > 1) {
      if (money[1].length < 2) {
        return `${value}0`;
      }
    } else {
        return `${value}.00`;
    }
  }
  return value;
}

export function formatTitle(title) {
  if (title.length > 60) {
    console.log(title);
    return `${title.slice(0, 60)}...`;
  }
  return title;
}

export function formatCurrencyCode(currency) {
  switch (currency) {
    case "BRL":
      return "R$";
    case "GBP":
      return "£";
    case "EUR":
      return "€";
    case "USD":
      return "$";
    default:
      return currency;
  }
}

export default function Book(props) {
  return (
    <div key={props.book.id} className="book-item">
      {props.book.volumeInfo?.imageLinks && (
        <img
          src={props.book.volumeInfo?.imageLinks?.thumbnail}
          alt={`capa ${props.book.volumeInfo.title}`}
        />
      )}
      {!props.book.volumeInfo?.imageLinks && (
        <div className="not-have-thumb ">
          <p>Nenhuma imagem disponível</p>
        </div>
      )}
      <p>{formatTitle(props.book?.volumeInfo?.title)}</p>
      <p>{props.book?.volumeInfo?.subtitle}</p>
      {props.book?.saleInfo?.retailPrice && (
        <p>{`${formatCurrencyCode(
          props.book?.saleInfo?.retailPrice?.currencyCode
        )} ${formatPrice(props.book?.saleInfo?.retailPrice?.amount)}`}</p>
      )}
    </div>
  );
}
