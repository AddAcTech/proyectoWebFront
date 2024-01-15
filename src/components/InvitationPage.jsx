import React from "react";
import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
});

function InvitationPage({ guestNumber, name, id, event_location, award }) {
  return (
    <Page style={styles.page}>
      <View>
        <Text>GALA DEL INSTITUTO POLITECNICO NACIONAL</Text>
        <Text style={styles.text}>
          Invitación para el invitado de {name} con ID: {id} número:
          {guestNumber}
        </Text>
        <Text>
          Ubicado en {event_location} se le otorgara la presea {award}
        </Text>
      </View>
    </Page>
  );
}

export default InvitationPage;
