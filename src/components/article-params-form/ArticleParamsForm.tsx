import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from '../../constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

interface ChildComponentProps {
	mainRef: React.RefObject<HTMLElement>;
}

interface stylesStates {
	fontFamilyState: OptionType;
	fontSizeState: OptionType;
	fontColorsState: OptionType;
	contentWidthState: OptionType;
	backgroundColorsState: OptionType;
}

function setProperty(
	ref: React.RefObject<HTMLElement>,
	{
		fontFamilyState,
		fontSizeState,
		fontColorsState,
		contentWidthState,
		backgroundColorsState,
	}: stylesStates
): void {
	if (ref.current) {
		ref.current.style.setProperty('--font-family', fontFamilyState.value);
		ref.current.style.setProperty('--font-size', fontSizeState.value);
		ref.current.style.setProperty('--font-color', fontColorsState.value);
		ref.current.style.setProperty('--container-width', contentWidthState.value);
		ref.current.style.setProperty('--bg-color', backgroundColorsState.value);
	}
}

export const ArticleParamsForm = ({ mainRef }: ChildComponentProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamilyState, setFontFamilyState] = useState(fontFamilyOptions[0]);
	const [fontSizeState, setFontSizeState] = useState(fontSizeOptions[0]);
	const [fontColorsState, setFontColorsState] = useState(fontColors[0]);
	const [backgroundColorsState, setBackgroundColorsState] = useState(
		backgroundColors[0]
	);
	const [contentWidthState, setcontentWidthState] = useState(
		contentWidthArr[0]
	);
	const onClickRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	const clear = () => {
		setFontFamilyState(fontFamilyOptions[0]);
		setFontSizeState(fontSizeOptions[0]);
		setFontColorsState(fontColors[0]);
		setBackgroundColorsState(backgroundColors[0]);
		setcontentWidthState(contentWidthArr[0]);

		setProperty(mainRef, {
			fontFamilyState: fontFamilyOptions[0],
			fontSizeState: fontSizeOptions[0],
			fontColorsState: fontColors[0],
			contentWidthState: backgroundColors[0],
			backgroundColorsState: contentWidthArr[0],
		});

		setIsOpen(false);
	};

	const apply = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		setProperty(mainRef, {
			fontFamilyState,
			fontSizeState,
			fontColorsState,
			contentWidthState,
			backgroundColorsState,
		});

		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				onClickRef.current &&
				!onClickRef.current.contains(event.target as Node) &&
				!(event.target as HTMLElement).closest('li')
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div ref={onClickRef}>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside data-is-open={isOpen || undefined} className={styles.container}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						title='шрифт'
						selected={fontFamilyState}
						onChange={setFontFamilyState}
					/>
					<RadioGroup
						options={fontSizeOptions}
						title='размер шрифта'
						selected={fontSizeState}
						onChange={setFontSizeState}
						name='radio'
					/>
					<Select
						options={fontColors}
						title='цвет шрифта'
						selected={fontColorsState}
						onChange={setFontColorsState}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='цвет фона'
						selected={backgroundColorsState}
						onChange={setBackgroundColorsState}
					/>
					<Select
						options={contentWidthArr}
						title='ширина контента'
						selected={contentWidthState}
						onChange={setcontentWidthState}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={clear}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={apply}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};
