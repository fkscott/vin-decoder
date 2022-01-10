<script>

	//boolean for loading spinner
	let hidden = true;


	let vehicleInfo = [];
	let vinSearch = "";
	let modelYear = ""

	function toggleSpinner()
	{
		hidden = !hidden;
	}

	//sends our vin and model year to the backend for the API call
	async function lookupVin(e) {
		toggleSpinner();

		try{
			const returnedData = await fetch(`/vindecode?vin=${vinSearch}&modelYear=${modelYear}`)
			const response = await returnedData.json();
			vehicleInfo = response.data.Results;
			toggleSpinner();
		}

		catch(error){
			console.error(error);
		}
	}

</script>

<style>
	.bdr{
		border-radius: 
		6px;
		overflow:hidden;
	}
</style>


<main>

	<div class="container text-light">

		<div class="my-5 row text-center">
			<div class="col-md-12">
				<h1>VIN Decoder</h1>
				<p class="lead">This tool was built using the <a href="https://vpic.nhtsa.dot.gov/api/" target="_blank">NHTSA API</a></p>
			</div>
		</div>

		<div class="my-5 row">
			<div class="col-md-12 text-center">
				
				<h2>VIN Lookup</h2>
				<div class="form-floating mb-3 text-dark">
					<input type="text" class="form-control" placeholder="Enter a VIN#" id="floatingVinInput" bind:value={vinSearch} />
					<label for="floatingnVinInput">Enter a VIN#</label>
				</div>
				<div class="form-floating mb-3 text-dark">

					<input type="text" class="form-control" placeholder="Enter Your Model Year" id="floatingYearInput" bind:value={modelYear} />
					<label for="floatingYearInput">Enter Your Model Year</label>
				</div>
				<br>
				<button type ="button" class="btn btn-lg btn-primary mb-3" on:click={lookupVin}>Decode Vin</button>

				<div class="vin-table text-center">

					{#if vehicleInfo.length > 0 }
					<table class="table table-dark table-bordered table-striped bdr">

					<tbody class="mt-3">
						<tr>
							<td class="fw-bold">Make</td>
							<td>{vehicleInfo[6].Value}</td>
						</tr>
						<tr>
							<td class="fw-bold">Model</td>
							<td>{vehicleInfo[8].Value}</td>
						</tr>
						<tr>
							<td class="fw-bold">Engine Name</td>
							<td>{vehicleInfo[73].Value}</td>
						</tr>	
						<tr>
							<td class="fw-bold">Engine Displacement</td>
							<td>{(Math.round(vehicleInfo[71].Value * 10) /10)}L</td>
						</tr>
						<tr>
							<td class="fw-bold">Horsepower</td>
							<td>
								{#if vehicleInfo[80].Value}
									No Horsepower Information Available 😢
								{:else}
									{vehicleInfo[80].Value}
								{/if}
							</td>
						</tr>

					</tbody>


					</table>

					{:else}
						<!-- Spinner that is toggled on the API call -->
						<div class="text-center mt-5" id="tableSpinner" hidden="{hidden}" >
							<div class="spinner-border" role="status">
							  <span class="visually-hidden">Loading...</span>
							</div>
						  </div>
					{/if}
				</div>
			</div>
		</div>



	</div>
</main>
