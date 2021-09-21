import React from 'react';
import { Text } from "@chakra-ui/react"

function PostSuccess() {
  return (
    <React.Fragment>
      <Text >
        Thank you for your order.
      </Text>
      <Text >
        Your order number is #2001539. We have emailed your order confirmation,
        and will send you an update when your order has shipped.
      </Text>
    </React.Fragment>
  );
}

export default PostSuccess;
