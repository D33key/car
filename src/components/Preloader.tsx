import { useEffect, useState } from 'react';

export default function Preloader() {
	const [isFirstVisit] = useState(() => {
		if (localStorage.getItem('visited')) return false;
		return true;
	});
	const [progress, setProgress] = useState(0);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const duration = isFirstVisit ? 5000 : 3000; // 3 секунды
		const intervalTime = 30; // Обновляем прогресс каждые 30мс
		const totalSteps = duration / intervalTime;
		let step = 0;

		const interval = setInterval(() => {
			step += 1;
			const newProgress = Math.min((step / totalSteps) * 100, 100);
			setProgress(newProgress);

			if (newProgress >= 100) {
				clearInterval(interval);
				localStorage.setItem('visited', 'true');
				setTimeout(() => setIsVisible(false), 200); // Небольшая задержка перед скрытием
			}
		}, intervalTime);

		return () => clearInterval(interval);
	}, []);

	if (!isVisible) return null;

	return (
		<div className='preloader-overlay'>
			<div className='preloader-container'>
				<div className='preloader-progress-bar'>
					<div
						className='preloader-progress-fill'
						style={{ width: `${progress}%` }}
					></div>
				</div>
				<div className='preloader-text'>{Math.round(progress)}%</div>
				<p>
					Для управления используйте WASD или стик на экране, если с моб.
					устройства
				</p>
			</div>
		</div>
	);
}
