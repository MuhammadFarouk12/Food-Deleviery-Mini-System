SELECT
  users.user_name,
  dishes.dish_name,
  dishes.dish_price
FROM
  (
    (
      orders
      JOIN users USING (user_id)
    )
    JOIN dishes USING (dish_id)
  );