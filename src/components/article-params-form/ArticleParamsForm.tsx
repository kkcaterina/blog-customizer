// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-unresolved */
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	OptionType,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export type FormProps = {
	setAppSettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setAppSettings }: FormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClose = (e: MouseEvent) => {
			if (
				isOpen &&
				asideRef.current &&
				!asideRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClose);
		return () => {
			document.removeEventListener('mousedown', handleClose);
		};
	}, [isOpen]);

	const {
		backgroundColor,
		contentWidth,
		fontColor,
		fontFamilyOption,
		fontSizeOption,
	} = formSettings;

	const handleFontFamilyChange = (newValue: OptionType) =>
		setFormSettings((prevValue) => ({
			...prevValue,
			fontFamilyOption: newValue,
		}));
	const handleFontSizeChange = (newValue: OptionType) =>
		setFormSettings((prevValue) => ({
			...prevValue,
			fontSizeOption: newValue,
		}));
	const handleFontColorChange = (newValue: OptionType) =>
		setFormSettings((prevValue) => ({ ...prevValue, fontColor: newValue }));
	const handleBackgroundColorChange = (newValue: OptionType) =>
		setFormSettings((prevValue) => ({
			...prevValue,
			backgroundColor: newValue,
		}));
	const handleContentWidthChange = (newValue: OptionType) =>
		setFormSettings((prevValue) => ({ ...prevValue, contentWidth: newValue }));

	const handleResetForm = () => {
		setAppSettings(defaultArticleState);
		setFormSettings(defaultArticleState);
	};

	const handleSubmitForm = (e: React.FormEvent) => {
		e.preventDefault();
		setAppSettings(formSettings);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((prevState) => !prevState)}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}></RadioGroup>
					<Select
						title='цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={handleFontColorChange}></Select>
					<Separator></Separator>
					<Select
						title='цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}></Select>
					<Select
						title='ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
