import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const date = new Date();
interface MessageProps {
	message: string;
  }
const message: React.FC<MessageProps> = (props) => {
	return (
		<View style={styles.message}>
			<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
					<Image source={require("../assets/images/user.png")} style={styles.icon} />
					<Text style={{ fontWeight: 500 }}>Username</Text>
				</View>
				<Text style={{ fontSize: 10, fontWeight: 600 }}>
					{date.getHours()}:{date.getMinutes()}
				</Text>
			</View>
			<Text style={{ fontSize: 14, width: "100%", flex: 1, paddingLeft: 0 }}>{props.message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	message: {
		flexDirection: "column",
		gap: 8,
		backgroundColor: "#f1f2f3",
		marginBottom: 8,
		padding: 16,
		borderRadius: 16,
	},
	icon: {
		width: 28,
		height: 28,
	},
});
export default message;