import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import {
	SignInContainer,
	SignInTitle,
	ButtonsBarContainer,
} from './sign-in.styles';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = { email: '', password: '' };
	}

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({ email: '', password: '' });
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<SignInContainer>
				<SignInTitle>I already have an account</SignInTitle>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						handleChange={this.handleChange}
						value={this.state.email}
						label="email"
						required
					/>
					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						handleChange={this.handleChange}
						label="password"
						required
					/>
					<ButtonsBarContainer>
						<CustomButton type="submit"> Sign in </CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign in with Google
						</CustomButton>
					</ButtonsBarContainer>
				</form>
			</SignInContainer>
		);
	}
}

export default SignIn;
