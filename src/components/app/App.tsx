import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { CSSProperties, useState } from 'react';
import styles from './App.module.scss';

export const App = () => {
	const [appSettings, setAppSettings] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appSettings.fontFamilyOption.value,
					'--font-size': appSettings.fontSizeOption.value,
					'--font-color': appSettings.fontColor.value,
					'--container-width': appSettings.contentWidth.value,
					'--bg-color': appSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setAppSettings={setAppSettings} />
			<Article />
		</main>
	);
};
