import React from "react";
import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Helvetica-Bold", // Aplica negrita al título
    marginBottom: 15,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Helvetica",
  },
});

function InvitationPage({
  guestNumber,
  name,
  id,
  event_location,
  award,
  apoyo,
}) {
  return (
    <Page style={styles.page}>
      <View>
        <Image
          style={styles.image}
          src="src\assets\gala.png" // Reemplaza esto con la ruta a tu imagen
        />
        <Text style={styles.title}>
          GALA DEL INSTITUTO POLITECNICO NACIONAL
        </Text>
        <Text style={styles.text}>
          Nos complace invitar al distinguido {name} con ID: {id} a nuestra gala
          anual.
        </Text>
        <Text style={styles.text}>
          Este evento se llevará a cabo en {event_location}. Durante la gala, se
          le otorgará la presea {award}.
        </Text>
        {apoyo === "Necesito apoyo" ? (
          <Text style={styles.text}>
            Se le brindará apoyo debido a su condición física.
          </Text>
        ) : (
          <Text style={styles.text}>
            Hemos notado que no necesita apoyo adicional.
          </Text>
        )}
        <Text style={styles.text}>
          Esperamos contar con su presencia para celebrar este evento especial.
        </Text>
        <Image
          style={styles.image}
          src="src\assets\ipn.jpg" // Reemplaza esto con la ruta a tu imagen
        />
      </View>
    </Page>
  );
}

export default InvitationPage;
