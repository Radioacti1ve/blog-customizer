import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [flag, setFlag] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	const handleClick = () => {
		setFlag((prev) => !prev);
	};

	useEffect(() => {
		if (asideRef.current) {
			if (flag) {
				asideRef.current.classList.add(styles.container_open);
			} else {
				asideRef.current.classList.remove(styles.container_open);
			}
		}
	}, [flag]);

	return (
		<>
			<ArrowButton isOpen={flag} onClick={handleClick} />
			<aside ref={asideRef} className={styles.container}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
